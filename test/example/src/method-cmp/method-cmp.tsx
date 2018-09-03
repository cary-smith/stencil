import { Component, Method, Prop } from '../../../../dist/index';

@Component({
  tag: 'method-cmp'
})
export class MethodCmp {

  @Prop() someProp = 0;

  @Method()
  someMethod() {
    return this.someProp;
  }

  @Method()
  someMethodWithArgs(unit: string, value: number) {
    return `${value} ${unit}`;
  }
}
