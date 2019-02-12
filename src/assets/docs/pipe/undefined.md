### @Pipe({name: 'Undefined'})

- `value` 传入对象

例如，假设存在一个未定义属性

```typescript
export class AnyComponent {
    test;
}
```

在模版中判断使用

```html
<div *ngIf="test|Undefined">
    <!-- here display -->
</div>
```