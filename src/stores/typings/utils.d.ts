
//用于接收一个对象然后转换为键值对
type ObjToKeyValueArray<T> = {
    [K in keyof T]: { key: K ; value:T [ K ]  };
}[keyof T];