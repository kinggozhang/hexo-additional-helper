# hexo-additional-helpers
A hexo plugin to provide additional helpers

# new helpers
## ah_list_archives 
it provide additional callback which enable user to customize archive item.

### why not list_archives? 
official list_archives is powerful, but less customizable. you can ONLY partly control the class name of element even though you give class option like: {class:myclass} , it will extended to myclass_list, myclass_list_item, myclass_list_link...

### example(using bootstrap4):
```
      <%- ah_list_archives({show_count: theme.show_count, type: theme.archive_type, callback:function(name,url,cnt)
                        {
                        let result='<a href="';
                        result += url;
                        result +='" class="list-group-item">';
                        result += name;
                        result += ' <span class="badge badge-primary">';
                        result += cnt;
                        result += '</span></a>';                        
                        return result; 
                        }}) %>
                        
```
##  ah_list_posts
list posts of specified tag

  ### example:
```
<%- ah_list_posts({tagname:'hexo',callback:function(title,url,content){return '<p>'+title+url+'</p>';}}) %>
```
## usage 
under your blog dir:
```
npm install hexo-additional-helper --save
```
**powered by [JM Zhang](http://www.sumoon.com)**
   
