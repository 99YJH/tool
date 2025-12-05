declare namespace JSX {
  interface IntrinsicElements {
    webview: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string
      preload?: string
      nodeintegration?: string
      disablewebsecurity?: string
      partition?: string
      allowpopups?: string
      useragent?: string
      style?: React.CSSProperties
    }
  }
}
