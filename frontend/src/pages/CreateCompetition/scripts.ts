import moment from 'moment';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export const formatDate = (date: Date, format = 'YYYY-MM-DD'): string =>
  moment(date).format(format);

export const getEditorValue = (editorState: EditorState): string => {
  const hashConfig = {
    trigger: '#',
    separator: ' ',
  };
  return draftToHtml(convertToRaw(editorState.getCurrentContent()), hashConfig);
};

export const getDateRange = (starting: Date, ending: Date): string =>
  `{"lower": "${formatDate(starting)}", "upper": "${formatDate(ending)}"}`;
