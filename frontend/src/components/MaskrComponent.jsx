import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@mediapipe/face_mesh';

const MaskrComponent = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(true);

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        const model = await faceLandmarksDetection.load(
          faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
          { maxFaces: 1 }
        );
        setModel(model);
        setIsModelLoading(false);
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };
    loadModel();
  }, []);

  const detect = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4 &&
      model
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = await model.estimateFaces({
        input: video,
      });

      const ctx = canvasRef.current.getContext('2d');
      drawMask(face, ctx);
    }
  };

  const drawMask = (predictions, ctx) => {
    if (predictions.length > 0) {
      predictions.forEach((prediction) => {
        const keypoints = prediction.scaledMesh;

        // Draw face mesh
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Draw mask overlay
        ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
        ctx.beginPath();
        ctx.moveTo(keypoints[10][0], keypoints[10][1]);
        
        // Draw mask contour using facial landmarks
        for (let i = 0; i < keypoints.length; i++) {
          const [x, y] = keypoints[i];
          ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fill();
      });
    }
  };

  useEffect(() => {
    const runDetection = setInterval(() => {
      detect();
    }, 100);

    return () => clearInterval(runDetection);
  }, [model]);

  return (
    <div className="relative w-full h-full">
      {isModelLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white z-10">
          Loading Maskr Model...
        </div>
      )}
      <div className="relative">
        <Webcam
          ref={webcamRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 9,
            width: '100%',
            height: '100%',
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 9,
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </div>
  );
};

export default MaskrComponent; 