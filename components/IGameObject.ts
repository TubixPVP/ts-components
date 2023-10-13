module components
{
    export interface IGameObject
    {
        addComponent<T extends Component>(type: { new(): T ;} ) : T;
        hasComponent<T extends Component>(type: { new(): T ;} ) : boolean;
        getComponent<T extends Component>(type: { new(): T ;} ) : T;
        getComponentInChildren<T extends Component>(type: { new(): T ;} ) : T;
        getComponentsInChildren<T extends Component>(type: { new(): T ;} ) : T[];
        getComponentInParent<T extends Component>(type: { new(): T ;} ) : T;

        addChild(gameObject:IGameObject) : void;
        removeChild(gameObject:IGameObject) : void;
        hasChild(gameObject:IGameObject) : boolean;
        get parent() : IGameObject;
    }
}