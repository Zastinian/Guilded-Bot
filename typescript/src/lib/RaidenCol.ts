"use strict";

export default class RaidenCol<K, V> extends Map<K, V> {
	get size(): number {
		return super.size;
	}

	map<U>(fn: (value: V, key: K, map: Map<K, V>) => U): U[] {
		let array: K[] = [];
		for (let [key, val] of this) {
			array.push(key);
		}
		return array.map(fn as any);
	}

	mapVal<U>(fn: (value: V) => U): U[] {
		let valIter = this.values();
		return Array.from(
			{
				length: this.size,
			},
			() => {
				let values = valIter.next();
				return values.value !== undefined ? fn(values.value) : undefined;
			}
		).filter((item) => item !== undefined) as U[];
	}

	first(): V | undefined {
		if (this.size <= 0) return undefined;
		return this.values().next().value;
	}

	find(fn: (value: V, key: K, map: Map<K, V>) => boolean): V | undefined {
		for (let [key, val] of this) {
			if (fn(val, key, this)) return val;
		}
		return undefined;
	}

	filter(fn: (value: V, key: K, map: Map<K, V>) => boolean): RaidenCol<K, V> {
		let result = new RaidenCol<K, V>();
		for (let [key, val] of this) {
			if (fn(val, key, this)) result.set(key, val);
		}
		return result;
	}

	filterKey(fn: (key: K, value: V, map: Map<K, V>) => boolean): RaidenCol<K, V> {
		let result = new RaidenCol<K, V>();
		for (let [key, val] of this) {
			if (fn(key, val, this)) result.set(key, val);
		}
		return result;
	}

	last(): V | undefined {
		if (this.size <= 0) return undefined;
		return Array.from(this.values())[Array.from(this.values()).length - 1];
	}

	lastKey(): K | undefined {
		return this.keyArray()[this.keyArray().length - 1];
	}

	tap(fn: (map: RaidenCol<K, V>) => void): RaidenCol<K, V> {
		fn(this);
		return this;
	}

	has(key: K): boolean {
		return super.has(key);
	}

	array(): V[] {
		return Array.from(this.values());
	}

	keyArray(): K[] {
		return Array.from(this.keys());
	}

	hasAll(...keys: K[]): boolean {
		if (Array.isArray(keys[0])) {
			return keys[0].every((o) => super.has(o));
		} else {
			return keys.every((o) => super.has(o));
		}
	}

	hasAny(...keys: K[]): boolean {
		if (Array.isArray(keys[0])) {
			return keys[0]?.some((o) => super.has(o));
		} else {
			return keys?.some((o) => super.has(o));
		}
	}

	some(fn: (value: V, key: K, map: Map<K, V>) => boolean): boolean {
		for (const [key, val] of this.entries()) {
			if (fn(val, key, this)) return true;
		}

		return false;
	}
	random(): V {
		const array = Array.from(this.values())[Math.floor(Math.random() * this.size)];
		return array;
	}
	get(k: K): V | undefined {
		return super.get(k);
	}
	every(fn: (value: V, key: K) => boolean): boolean {
		for (const [key, val] of this) {
			if (!fn(val, key)) return false;
		}
		return true;
	}
	each(fn: (value: V, key: K) => void): this {
		this.forEach(fn);
		return this;
	}
	randomKey(): K {
		return Array.from(this.keys())[Math.floor(Math.random() * this.size)];
	}
	equals(collection: Map<K, V> | undefined): boolean {
		if (!collection) return false;
		if (this.size !== collection.size) return false;
		if (this === collection) return true;
		for (const [key, val] of this) {
			if (collection.has(key) || val !== collection.get(key)) return false;
		}
		return true;
	}
	difference(collection: Map<K, V>): K[] | string {
		if (this.size !== collection.size) return `size difference by: ${Math.abs(this.size - collection.size)}`;
		return Array.from(collection.keys()).filter((value) => !this.has(value));
	}
	findKey(fn: (key: K, value: V) => boolean): K | this {
		for (const [key, val] of this) {
			if (fn(key, val)) return key;
		}
		return this;
	}
	sort(fn: (a: V, b: V, aKey: K, bKey: K) => number = RaidenCol.compareFunction): this {
		const entries = [...this.entries()];
		entries.sort((a, b) => fn(a[1], b[1], a[0], b[0]));
		super.clear();
		for (const [key, val] of entries) {
			super.set(key, val);
		}
		return this;
	}
	clear(): void {
		super.clear();
	}
	at(index: number = 0): V | undefined {
		const collectionArr = Array.from(this.values());
		return collectionArr[index];
	}
	static compareFunction(one: any, two: any): number {
		return Number(one > two || one === two) - 1;
	}
}
