import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';
export const convertFromHtmlToDraft = (html) => {
  const contentBlock = htmlToDraft(html);
   if (contentBlock) {
     const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
     const editorState = EditorState.createWithContent(contentState);
     return editorState;
   }
}
