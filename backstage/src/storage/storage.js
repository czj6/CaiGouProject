/**
 * storage封装
 */
 const STORAGE_KEY = 'caigou';  //storage标识符，名字
 export default {
     /*
     setItem(key,value,module)
     module是某一模块下的，比如
     {
       user:{
         username: xxx
       }
     }
     设置user下面的username
     */
     setItem(key, value, module) {
         if (module) {
             let val = this.getItem(module);
             val[key] = value;
             this.setItem(module, val)
         } else {
             let val = this.getStorage();
             val[key] = value;
             window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))//保存数据到sessionStorage中，window.sessionStorage.setItem(名字,数据)；
         }
     },
     /*
     {
     user:{
       username: lihua,
       age: 18
     }
     }
     getItem(username,user)
     */
     getItem(key, module) {
         if (module) {
             let val = this.getItem(module)
             if (val)
                 return val[key]
         }
         return this.getStorage()[key]
     },
     // 获取sessionStorage
     getStorage() {
         return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')
     },
     //清除方法
     clear(key, module) {
         let val = this.getStorage();
         if (module) {
             if (!val[module]) return;
             delete val[module][key]
         } else {
             delete val[key]
         }
         window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
     }

 }
