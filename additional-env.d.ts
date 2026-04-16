// CSS dosyalarını modül olarak tanımlıyoruz
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}