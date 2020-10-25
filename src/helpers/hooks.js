class Hook {
    constructor() {
        this._listeners = {}
    }

    tap(name, listener) {
        if (name == undefined)
            throw new Error('Hook.on(): should be on(name:string, listener:function) but name is undefined');
        if (this._listeners[name])
            throw new Error('Hook.on(name:string, listener:function): a listener with name "' + name + '" already exists - choose another name.');
        if (listener == undefined)
            throw new Error('Hook.on(): should be on(name:string, listener:function) but listener is undefined');

        this._listeners[name] = listener;
    }
    off(name) {
        if (name == undefined)
            throw new Error('Hook.off(): should be on(name:string, listener:function) but name is undefined');

        delete this._listeners[name];
    }
    listeners(name) {
        if (name)
            return this._listeners[name];
        else
            return Object.values(this._listeners);
    }
}

class SyncHook extends Hook {
    call(ctx) {
        const events = this.listeners();
        for (let event of events) {
            event(...arguments);
        }
    }
}

class AsyncHook extends Hook {
    async promise(ctx) {
        const events = this.listeners();
        for (let event of events) {
            await event(...arguments);
        }
    }
}

class SyncWaterfallHook extends Hook {
    call(ctx) {
        let result = ctx;
        const events = this.listeners();

        for (let event of events) {
            if (result == null)
                throw new Error('A listener in SyncWaterfallHook.trigger(context) returns null. This is not allowed. Did you forget returning sth in a listener?')
            result = event(result, ...arguments);
        }
        return result;
    }
}

class AsyncWaterfallHook extends Hook {
    async promise(ctx) {
        let result = ctx;
        const events = this.listeners();

        for (let event of events) {
            result = await event(result, ...arguments);
        }
        return result;
    }
}

class SyncBreakableHook extends Hook {
    call(ctx) {
        const events = this.listeners();

        for (let event of events) {
            const result = event(...arguments);
            if (!result)
                return;
        }
    }
}

class AsyncBreakableHook extends Hook {
    async call(ctx) {
        const events = this.listeners();

        for (let event of events) {
            const result = await event(...arguments);
            if (!result)
                return;
        }
    }
}

export { Hook, SyncHook, AsyncHook, SyncWaterfallHook, AsyncWaterfallHook, SyncBreakableHook, AsyncBreakableHook }