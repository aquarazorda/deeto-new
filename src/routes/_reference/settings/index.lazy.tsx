import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_reference/settings/')({
  component: () => <div>Hello /_reference/settings/!</div>
})