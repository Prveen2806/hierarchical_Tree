import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent {
  treeForm: FormGroup;
  treeData: { [key: string]: string[] } = {};

  constructor(private fb: FormBuilder) {
    this.treeForm = this.fb.group({
      nodes: this.fb.array([this.createNodeGroup()]),
    });
    this.treeForm.valueChanges.subscribe((val) => {
      this.treeData = this.buildTree(val.nodes);
    });
  }
  createNodeGroup(): FormGroup {
    return this.fb.group({
      parent: ['', Validators.required],
      children: ['', Validators.required],
    });
  }

  get nodes() {
    return this.treeForm.get('nodes') as FormArray;
  }

  addNode() {
    this.nodes.push(this.createNodeGroup());
    console.log(this.nodes);

  }

  removeNode(index: number) {
    this.nodes.removeAt(index);
  }
  buildTree(nodes: any[]): { [key: string]: string[] } {
    const tree: { [key: string]: string[] } = {};
    nodes.forEach((n) => {
      if (n.parent && n.children) {
        tree[n.parent.trim()] = n.children
          .split(',')
          .map((c: string) => c.trim())
          .filter((c: string) => c.length > 0);
      }
    });
    return tree;
  }
  get root(): string | null {
    const keys = Object.keys(this.treeData);
    return keys.length ? keys[0] : null;
  }
}
