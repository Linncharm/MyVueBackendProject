
//用于接收一个对象然后转换为键值对
type ObjToKeyValueArray<T> = {
    [K in keyof T]:  [ K , T [ K ] ];
}[keyof T];