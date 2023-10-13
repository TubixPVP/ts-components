///<reference path="components/RootObject.ts"/>
module test
{
    import IGameObject = components.IGameObject;
    import GameObject = components.GameObject;
    import Component = components.Component;
    import RootObject = components.RootObject;

    export class TestComponent extends Component
    {
        public override init(gameObject: IGameObject) {
            console.log("TestComponent: init()",gameObject);
        }
        public override update(deltaMs: number) {
            console.log("TestComponent: update()",deltaMs);
        }
    }
    export class test
    {
        constructor() {

            let scene:RootObject = new RootObject();

            let testObject1:IGameObject = new GameObject();
            testObject1.addComponent(TestComponent);
            scene.addChild(testObject1);

            //scene.start();

            let testComponent:TestComponent = scene.getComponentInChildren(TestComponent);

            console.log(testComponent);

        }
    }
}

new test.test();