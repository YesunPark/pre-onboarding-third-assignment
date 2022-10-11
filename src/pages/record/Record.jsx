import { useEffect, useState } from 'react';

const Record = () => {
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const recorder = new MediaRecorder(stream);
    })();
  }, []);

  return <div>asd</div>;
};

export default Record;
