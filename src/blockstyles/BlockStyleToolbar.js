
export const BLOCK_TYPES = [
    { label: " “ ” ", style: "blockquote" },
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
    { label: "{ }", style: 'code-block' }
   ];
   export const BLOCK_TYPE_HEADINGS = [
     { label: "H1", style: "header-one" },
     { label: "H2", style: "header-two" },
     { label: "H3", style: "header-three" },
     { label: "H4", style: "header-four" },
     { label: "H5", style: "header-five" },
     { label: "H6", style: "header-six" }
   ]

   export function getBlockStyle(block) {
    switch (block.getType()) {
     case "blockquote":
      return "RichEditor-blockquote";
     default:
      return null;
    }
   }