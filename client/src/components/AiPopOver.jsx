// @flow strict
"use client";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

function ReactPopover({ children, content, trigger = "click" }) {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef(null);

  const handleMouseOver = () => {
    if (trigger === "hover") {
      setShow(true);
    }
  };

  const handleMouseLeft = () => {
    if (trigger === "hover") {
      setShow(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShow(false);
      }
    }

    if (show) {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [show, wrapperRef]);

  ReactPopover.propTypes = {
    children: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    trigger: PropTypes.oneOf(["click", "hover"]),
  };

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeft}
      className="relative flex justify-center w-fit h-fit"
    >
      <div onClick={() => setShow(!show)}>{children}</div>
      <div
        hidden={!show}
        className="min-w-fit w-[200px] h-fit absolute bottom-[100%] z-50 transition-all"
      >
        <div className="rounded bg-white p-3 shadow-[10px_30px_150px_rgba(46,38,92,0.25)] mb-[10px]">
          {content}
        </div>
      </div>
    </div>
  );
}

export default ReactPopover;
