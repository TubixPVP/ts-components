module components
{
    export abstract class Component
    {

        /**
         * Calls before first frame update. Does not do anything. Override if need
         *
         * @param {IGameObject} gameObject The object that the component is attached
         * */
        public init(gameObject:IGameObject) : void
        {
        }

        /**
         * Calls every frame update. Does not do anything. Override if need
         *
         * @param {number} deltaMs Number of milliseconds that have passed since the last update
         * */
        public update(deltaMs:number):void
        {
        }
    }
}