import { Header } from '@/components/header'
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader } from '@/components/ui/sheet'

import { CreateOrganizationForm } from '../../create-organization/create-organization-form'

export default function CreateOrganizationSheet() {
  return (
    <>
      <Header />
      <Sheet defaultOpen>
        <InterceptedSheetContent>
          <SheetHeader>Create organization</SheetHeader>
          <div className="py-4">
            <CreateOrganizationForm />
          </div>
        </InterceptedSheetContent>
      </Sheet>
    </>
  )
}
