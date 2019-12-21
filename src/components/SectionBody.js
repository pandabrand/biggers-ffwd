import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';

const SectionBody = (props) => (
  <div>
    <ReactMarkdown escapeHtml={false} source={props.content} />
  </div>
)

export default SectionBody