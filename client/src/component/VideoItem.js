import React from "react";

const VideoItem = ({ video }) => (
  <>
    <div className="grow shrink basis-0 h-48 p-4 rounded-md border border-black border-opacity-10 justify-center items-start gap-4 flex">
      <div className="justify-start items-start flex">
        <div className="relative bg-zinc-300 bg-opacity-50">
          <video className="w-[160px] h-[140px]" poster={video.imagePath} >
            <source src="" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
        <div className="self-stretch text-black text-xl font-medium font-['Roboto'] leading-7">
          {video.nomvideo}
        </div>
        <div className="self-stretch text-black text-opacity-50 text-sm font-normal font-['Roboto'] leading-tight">
          Step by step guide
        </div>
        <div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-normal">
          {video.description}
        </div>
      </div>
      <br />
    </div>
  </>
);

export default VideoItem;
