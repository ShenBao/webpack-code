class SyncWaterfallHook {
  constructor (args) {
    this.tasks = [];
  }
  tap (name, task) {
    this.tasks.push (task);
  }
  call (...args) {
    let [first, ...others] = this.tasks;
    let ret = first(...args);
    others.reduce((a,b)=>{
      return b(a);
    }, ret);
  }
}

let hook = new SyncWaterfallHook (['name']);
hook.tap ('node', name => {
  console.log ('node', name);
  return 'node ok';
});
hook.tap ('react', data => {
  console.log ('react', data);
  return 'react ok';
});
hook.tap ('webpack', data => {
  console.log ('webpack', data);
});

hook.call ('test');
