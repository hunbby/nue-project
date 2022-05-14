declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@ckeditor/ckeditor5-vue'
declare module '@ckeditor/ckeditor5-build-decoupled-document'
declare module '@ckeditor/ckeditor5-build-classic'
declare module '@ckeditor/ckeditor5-markdown-gfm/src/markdown'
declare module '@ckeditor/ckeditor5-source-editing/src/sourceediting'
declare module '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
declare module '@ckeditor/ckeditor5-basic-styles/src/bold'
declare module '@ckeditor/ckeditor5-basic-styles/src/italic'
declare module '@ckeditor/ckeditor5-essentials/src/essentials'
declare module '@ckeditor/ckeditor5-link/src/link'
declare module '@ckeditor/ckeditor5-paragraph/src/paragraph'
declare module '@ckeditor/ckeditor5-autoformat/src/autoformat'
