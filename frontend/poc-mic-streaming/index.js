const app = new Vue({
    el: "#app",
    async created() {
      const stream = await navigator.mediaDevices
        .getUserMedia({ audio: true })
        .catch((error) => alert(error));

      if (!MediaRecorder.isTypeSupported("audio/webm"))
        return alert("Unsupported browser");
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
    },
    data: {
      mediaRecorder: null,
      socket: null,
      transcript: "",
      isRecording: false,
    },
    methods: {
      begin() {
        const DG_URL = "wss://api.deepgram.com/v1/listen?punctuate=true";
        const DG_KEY = "f5219c2675a53c8f8b996720ff405a8025632f63";
        this.socket = new WebSocket(DG_URL, ["token", DG_KEY]);
        this.socket.onopen = this.startStreaming;
        this.socket.onmessage = this.handleResponse;
      },
      startStreaming() {
        this.isRecording = true;
        this.mediaRecorder.addEventListener("dataavailable", this.sendEvent);
        this.mediaRecorder.start(250);
      },
      handleResponse(message) {
        const received = JSON.parse(message.data);
        console.log(received);
        if (received.channel) {
          const transcript = received.channel.alternatives[0].transcript;
          if (transcript) {
            this.transcript = this.transcript + " " + transcript;
          }
        }
      },
      stop() {
        this.isRecording = false;
        this.socket.send(JSON.stringify({ type: "CloseStream" }));
        this.mediaRecorder.stop();
        this.mediaRecorder.removeEventListener("dataavailable", this.sendEvent);
        this.socket = null;
      },
      sendEvent(event) {
        if (event.data.size > 0 && this.socket.readyState == 1) {
          this.socket.send(event.data);
        }
      },
    },
  });