import imgGeneratedImageSeptember0820251042Am1 from "figma:asset/9982da4dfc825ca635ac5581a0b4bd9e8b410b3a.png";
import { imgLock } from "./svg-b9r92";

function Lock() {
  return (
    <div
      className="absolute size-16 translate-x-[-50%] translate-y-[-50%]"
      data-name="Lock"
      style={{ top: "calc(50% + 0.5px)", left: "calc(50% + 0.5px)" }}
    >
      <img className="block max-w-none size-full" src={imgLock} />
    </div>
  );
}

function Container() {
  return (
    <div
      className="content-stretch flex flex-col gap-4 items-center justify-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div
        className="bg-[50.62%_48.91%] bg-no-repeat bg-size-[216.43%_244.52%] h-[347px] shrink-0 w-full"
        data-name="Generated Image September 08, 2025 - 10_42AM 1"
        style={{ backgroundImage: `url('${imgGeneratedImageSeptember0820251042Am1}')` }}
      />
      <Lock />
    </div>
  );
}

function Container1() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-4 items-center justify-center left-1/2 translate-x-[-50%] translate-y-[-50%] w-[393px]"
      data-name="Container"
      style={{ top: "calc(50% + 0.5px)" }}
    >
      <div
        className="h-20 leading-[0] not-italic relative shrink-0 text-[#f06a83] text-[64px] text-center w-full"
        style={{ fontFamily: "'Irish Grover', cursive" }}
      >
        <p className="leading-[normal]">I want to be</p>
      </div>
      <Container />
    </div>
  );
}

export default function IPhone161() {
  return (
    <div className="bg-white relative size-full" data-name="iPhone 16 - 1">
      <Container1 />
    </div>
  );
}
