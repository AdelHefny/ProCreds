import { RefObject } from "react";

function ContextMenu({
  refObject,
}: {
  refObject: RefObject<HTMLUListElement>;
}) {
  return (
    <ul
      className="off bg-main w-24 p-2 rounded-lg absolute z-50 flex flex-col items-center justify-center"
      ref={refObject}
    >
      <li className="cursor-pointer hover:bg-secant  px-2 w-full text-center transition-all duration-150">
        Edit
      </li>
      <li className="text-red cursor-pointer hover:bg-secant px-2 w-full text-center transition-all duration-150">
        Delete
      </li>
    </ul>
  );
}

export default ContextMenu;
