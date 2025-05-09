import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { RiReplay15Fill, RiForward15Fill } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../lib/store';
import { setActive } from '../../lib/features/activeSlice';

export default function AudioPlayer({ audio }: { audio: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!isSeeking) {
        setCurrentTime(audio.currentTime);
        setSeekValue(audio.currentTime);
      }
    };

    const updateDuration = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    dispatch(setActive("none"));

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [isSeeking]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSeekValue(value);
    setCurrentTime(value);
  };

  const handleSliderCommit = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = currentTime;
    setIsSeeking(false);
  };


  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.min(Math.max(0, audio.currentTime + seconds), duration);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex items-center w-full pl-130 pr-25 justify-between gap-4 p-4 text-white rounded-xl shadow-md">
      <div className="flex gap-4">
        <audio ref={audioRef} src={audio} preload="metadata" />
        <button onClick={() => skipTime(-15)}>
          <RiReplay15Fill size={30} />
        </button>
        <button onClick={togglePlay}>
          {isPlaying ? <FaPause size={30} /> : <FaPlay size={30} />}
        </button>
        <button onClick={() => skipTime(15)}>
          <RiForward15Fill size={30} />
        </button>
      </div>
      <div className=" flex items-center gap-2 text-end">
        <span className="text-xs text-white text-left">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={currentTime}
          onChange={handleSliderChange}
          onMouseDown={() => setIsSeeking(true)}
          onMouseUp={handleSliderCommit}
          onTouchStart={() => setIsSeeking(true)}
          onTouchEnd={handleSliderCommit}
          className="w-80 h-1 bg-gray-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <span className="text-xs text-white text-right">{formatTime(duration)}</span>
      </div>
    </div>
  );
}
