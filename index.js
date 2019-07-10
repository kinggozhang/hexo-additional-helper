//all helpers will start with AH_  (Additional Helper)
//list posts of specified tag
//callback function with three parameters:title, url, content
hexo.extend.helper.register('ah_list_posts', function(options){
    const tags = this.site.tags;
    const callback = options.callback;
    let result='';
    tags.map(tag => {
        if(tag.name === options.tagname)
        {
            tag.posts.forEach(post=>{
                if(callback)
                    result += callback(post.title,this.url_for(post.path),post.content);
                else
                    result += '<a href="${this.url_for(post.path)}">${post.title}</a>';
            });
        }
    });
    return result;
});

//ah_list_archives based on implementation of list_archives, 
//support one more option:callback,  which will take over constructing content of each archive item.
hexo.extend.helper.register('ah_list_archives', function(options){
  const config = this.config;
  const archiveDir = config.archive_dir;
  const timezone = config.timezone;
  const lang = this.page.lang || this.page.language || config.language;
  let format = options.format;
  const type = options.type || 'monthly';
  const style = options.hasOwnProperty('style') ? options.style : 'list';
  const showCount = options.hasOwnProperty('show_count') ? options.show_count : true;
  const transform = options.transform;
  const separator = options.hasOwnProperty('separator') ? options.separator : ', ';
  const className = options.class || 'archive';
  const order = options.order || -1;
  const callback = options.callback;
  let result = '';
  const self = this;

  if (!format) {
    format = type === 'monthly' ? 'MMMM YYYY' : 'YYYY';
  }

  const posts = this.site.posts.sort('date', order);
  if (!posts.length) return result;

  const data = [];
  let length = 0;

  posts.forEach(post => {
    // Clone the date object to avoid pollution
    let date = post.date.clone();

    if (timezone) date = date.tz(timezone);
    if (lang) date = date.locale(lang);

    const year = date.year();
    const month = date.month() + 1;
    const name = date.format(format);
    const lastData = data[length - 1];

    if (!lastData || lastData.name !== name) {
      length = data.push({
        name,
        year,
        month,
        count: 1
      });
    } else {
      lastData.count++;
    }
  });

  function link(item) {
    let url = `${archiveDir}/${item.year}/`;

    if (type === 'monthly') {
      if (item.month < 10) url += '0';
      url += `${item.month}/`;
    }

    return self.url_for(url);
  }

  let item, i, len;

  if (style === 'list' && !callback) {
    result += `<ul class="${className}-list">`;

    for (i = 0, len = data.length; i < len; i++) {
      item = data[i];

      result += `<li class="${className}-list-item">`;

      result += `<a class="${className}-list-link" href="${link(item)}">`;
      result += transform ? transform(item.name) : item.name;
      result += '</a>';

      if (showCount) {
        result += `<span class="${className}-list-count">${item.count}</span>`;
      }

      result += '</li>';
    }

    result += '</ul>';
  } else {
    for (i = 0, len = data.length; i < len; i++) {
      item = data[i];
      if(callback)
      {
          let name = transform ? transform(item.name) : item.name;
          //call callback function to handle name,url,count
          result += callback(name,link(item),item.count);
      }
      else
      {
          if (i) result += separator;
          
          result += `<a class="${className}-link" href="${link(item)}">`;
          result += transform ? transform(item.name) : item.name;

          if (showCount) {
            result += `<span class="${className}-count">${item.count}</span>`;
          }
          result += '</a>';
      }
    }
  }

return result;
    
});
