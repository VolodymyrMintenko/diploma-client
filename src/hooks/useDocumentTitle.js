import { useState, useEffect } from "react";

function useDocumentTitle(intialTitle) {
  const [title, setTitle] = useState(intialTitle);

  useEffect(() => {
    document.title = `${title}`;
  }, [title]);

  return [title, setTitle];
}
export default useDocumentTitle;
