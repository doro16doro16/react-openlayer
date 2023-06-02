import { SVGProps } from ".";

export function ZoomIn({ color = "black", size = 18 }: SVGProps) {
  return (
    <div>
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        color={`${color}`}
        height={`${size}`}
        width={`${size}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          stroke-linecap="square"
          stroke-linejoin="round"
          stroke-width="32"
          d="M256 112v288m144-144H112"
        ></path>
      </svg>
    </div>
  );
}
