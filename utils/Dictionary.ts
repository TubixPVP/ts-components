module utils
{
    export class Dictionary<Key, Value> {

        private readonly _keys: Array<Key> = new Array<Key>();

        private readonly _values: Array<Value> = new Array<Value>();


        public add(key:Key, value:Value) : void
        {
            if(key == null)
            {
                this.throwNullKey();
            }
            if(this.containsKey(key))
            {
                throw new Error("Key has been already added");
            }
            for(let i:number = 0; i < this._keys.length;i++)
            {
                if(this._keys[i] == null)
                {
                    this._keys[i] = key;
                    this._values[i] = value;
                    return;
                }
            }
            this._keys.push(key);
            this._values.push(value);
        }

        public get(key:Key) : Value
        {
            if(key == null)
            {
                this.throwNullKey();
            }
            let index:number = this._keys.indexOf(key);
            if(index == -1)
            {
                return null;
            }
            return this._values[index];
        }

        public remove(key:Key) : void
        {
            if(key == null)
            {
                this.throwNullKey();
            }
            let index:number = this._keys.indexOf(key);
            if(index != -1)
            {
                this._keys[index] = null;
                this._values[index] = null;
            }
        }

        private throwNullKey()
        {
            throw new Error("Key cannot be null");
        }

        public containsKey(key:Key) : boolean
        {
            if(key == null)
            {
                this.throwNullKey();
            }
            return this._keys.indexOf(key) != -1;
        }
        public containsValue(value:Value) : boolean
        {
            return this._values.indexOf(value) != -1;
        }

    }
}