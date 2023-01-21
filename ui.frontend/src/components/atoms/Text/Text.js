/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2020 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import sanitizeHtml from 'sanitize-html';
import sanitizeWhiteList from '../../sanitize-html.whitelist';

import React from 'react';
import extractModelId from '../../../utils/extract-model-id';

import './Text.scss';

/**
 * Text React component
 */

const Text = (props) => {
  const richTextContent = () => {
    return (<div
      id={extractModelId(props.cqPath)}
      data-rte-editelement
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(props.text, sanitizeWhiteList)
      }}
    />)
  };

  return (
    <div className="text-component">
      {props.richText ? richTextContent() : props.text}
    </div>
  )
};

export default Text;