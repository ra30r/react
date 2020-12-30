import React from "react";

// if 'text<n>asdf</n>text' -> 'text', '', 'asdf', 'n', 'text'
// if '<n>asdf</n>' -> '', '', 'asdf', 'n', ''
const TAGS_MATCH = /<(b|i|s|strong|sup|sub|mark)>([\s\S]*?)<\/\1>/g;
const TAGS_MAP = '-%--%-$2-%-$1-%-';

// if 'text<p>asdf</p>text' -> "text", "", "%%", "p", "asdf", "", "%\%", "p", "text"
const WTAGS_MATCH = /<(\/)?(p|div|span)(\/)?>/g;
const WTAGS_MAP = '-%--%-%$1%-%-$2-%-';

const SCTAGS_MATCH = /<(br)\s*(\/)?>/g;
const SCTAGS_MAP = '-%--%-%$2%-%-$1-%-';

export default ({children: content}) => { 
  const split_content = content
          .replace(/-%-/g, '')
          .replace(TAGS_MATCH, TAGS_MAP)
          
          .replace(/%\/?%/g, '')
          .replace(WTAGS_MATCH, WTAGS_MAP)

          .replace(/%\/\/%/g, '')
          .replace(SCTAGS_MATCH, SCTAGS_MAP)

          .split('-%-');
  
  // nodes are matched to 'content', 'tag-name'
  // levels determined by 'content' to be '%%' or '%\%', which respectively pushes/removes new level
  // all nodes are pushed to current level
  // when level 'closes', its turned into react element and result pushed up the level   
  const newNodes = [];
  const levels = [newNodes];

  for (let i = 0; i < split_content.length; i+=2) {
    const text = split_content[i]||null;
    const tag = split_content[i+1];

    // create level
    if(text == '%%'){
      levels.push([]);
    }
    // close level
    else if(text == '%/%'){
      const children = levels.splice(levels.length-1,1);
      const el = React.createElement(tag, {key: i}, children);

      levels[levels.length-1].push(el);
    }
    // handle self closing tag
    else if(text == '%//%'){
      const el = React.createElement(tag, {key: i}, null);

      levels[levels.length-1].push(el);
    }
    // create element
    else {
      // if tag name -> createElement
      levels[levels.length-1].push(
        tag
        ? React.createElement(tag, {key: i}, text)
        : text
      )
    }  

  }

  return <div>{newNodes}</div>;
}