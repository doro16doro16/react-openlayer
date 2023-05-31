import { SVGProps } from ".";

export function RectangleIcon({ color = "black", size = 18 }: SVGProps) {
  return (
    <div>
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        color={`${color}`}
        height={`${size}`}
        width={`${size}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
      </svg>
    </div>
  );
}
