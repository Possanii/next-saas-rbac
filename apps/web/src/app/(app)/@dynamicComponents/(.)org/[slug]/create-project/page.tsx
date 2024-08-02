import { CreateProjectForm } from '@/app/(app)/org/[slug]/create-project/create-project-form'
import { Header } from '@/components/header'
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader } from '@/components/ui/sheet'

export default function CreateOrganizationSheet() {
  return (
    <>
      <Header />
      <Sheet defaultOpen>
        <InterceptedSheetContent>
          <SheetHeader>Create project</SheetHeader>
          <div className="py-4">
            <CreateProjectForm />
          </div>
        </InterceptedSheetContent>
      </Sheet>
    </>
  )
}
