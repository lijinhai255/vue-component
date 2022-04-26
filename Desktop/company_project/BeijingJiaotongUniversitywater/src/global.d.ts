declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.md';
declare module '*.svg' {
  const content: string;
  export default content;
}
