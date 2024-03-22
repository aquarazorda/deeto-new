/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
//
export type IconComponent = FunctionComponent<
  SVGProps<SVGSVGElement> & { title?: string | undefined }
>;
