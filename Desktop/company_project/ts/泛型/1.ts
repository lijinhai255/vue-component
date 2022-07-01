interface newPerson<T> {
  name: T;
}

const newX: newPerson<string> = {
  name: "lijinhai",
};

//map遍历 方法

function pick<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map((n) => o[n]);
}
pick({key:1212},["key"])



let obj:Partial<{
    name:number,
    age:number,
    say:()=>{
    }
}> ={
    name:1,
    age:22
}

let obj2:Required<{name:string,age:number}>={
    name:"tzj",
    age:22
}