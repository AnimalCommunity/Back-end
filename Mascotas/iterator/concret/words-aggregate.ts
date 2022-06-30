import {Aggregator} from "../abstract/aggregator";
import {Iterator} from "../abstract/iterator";
import {AlphabeticalOrderIterator} from "./alphabetical-order-iterator";

export class WordsAggregate implements Aggregator {
    private items: string[] = [];

    public getIterator(): Iterator<string> {
        return new AlphabeticalOrderIterator(this);
    }

    public getReverseIterator(): Iterator<string> {
        return new AlphabeticalOrderIterator(this, true);
    }

    public getItems(): string[] {
        return this.items;
    }

    public getCount(): number {
        return this.items.length;
    }

    public addItem(item: string): void {
        this.items.push(item);
    }
}