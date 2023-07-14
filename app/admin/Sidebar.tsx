import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="sticky top-0 left-0 border-r h-screen min-w-[20rem] p-3 flex flex-col gap-2">
      <Link href={"/"}>Home</Link>
      <Link href={"/admin"}>Create Problem</Link>
      <Link href={"/admin/rte"}>Create Problem in Text Editor</Link>
    </div>
  );
};

export default Sidebar;
