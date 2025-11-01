import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
})
export class TreeNodeComponent {
  @Input() node!: string;
  @Input() tree!: { [key: string]: string[] };

  getChildren(): string[] {
    console.log(this.node);

    return this.tree[this.node] || [];
  }
}
