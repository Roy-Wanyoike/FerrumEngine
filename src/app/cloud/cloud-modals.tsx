"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModalOverlay } from "@/components/ui/modal-overlay";

const TOKEN_TYPES = ["color", "spacing", "typography", "shadow", "motion", "border", "radius"] as const;

const selectClass = "w-full h-9 px-3 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

export interface TokenFormState {
  name: string;
  value: string;
  type: string;
  namespace: string;
}

export function CreateTeamModal({ open, onClose, teamName, setTeamName, onSubmit }: {
  open: boolean; onClose: () => void;
  teamName: string; setTeamName: (v: string) => void; onSubmit: () => void;
}) {
  return (
    <ModalOverlay open={open} onClose={onClose} ariaLabelledBy="modal-create-team-heading">
      <div className="mb-4">
        <h2 id="modal-create-team-heading" className="text-base font-semibold text-foreground">Create Team</h2>
        <p className="text-sm text-muted-foreground mt-1">Teams organize your projects and collaborators.</p>
      </div>
      <div className="space-y-3 py-2">
        <Label htmlFor="team-name" className="text-xs">Team Name</Label>
        <Input id="team-name" placeholder="e.g. My Design Team" value={teamName} onChange={e => setTeamName(e.target.value)} onKeyDown={e => e.key === "Enter" && onSubmit()} />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} disabled={!teamName.trim()}>Create Team</Button>
      </div>
    </ModalOverlay>
  );
}

export function CreateProjectModal({ open, onClose, projName, setProjName, projEnv, setProjEnv, onSubmit }: {
  open: boolean; onClose: () => void;
  projName: string; setProjName: (v: string) => void;
  projEnv: string; setProjEnv: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <ModalOverlay open={open} onClose={onClose} ariaLabelledBy="modal-create-project-heading">
      <div className="mb-4">
        <h2 id="modal-create-project-heading" className="text-base font-semibold text-foreground">Create Project</h2>
        <p className="text-sm text-muted-foreground mt-1">A project holds design tokens and components.</p>
      </div>
      <div className="space-y-3 py-2">
        <div className="space-y-1.5">
          <Label htmlFor="proj-name" className="text-xs">Project Name</Label>
          <Input id="proj-name" placeholder="e.g. Core Design System" value={projName} onChange={e => setProjName(e.target.value)} onKeyDown={e => e.key === "Enter" && onSubmit()} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="proj-env" className="text-xs">Environment</Label>
          <select id="proj-env" value={projEnv} onChange={e => setProjEnv(e.target.value)} className={selectClass}>
            <option value="dev">Development</option><option value="staging">Staging</option><option value="production">Production</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} disabled={!projName.trim()}>Create Project</Button>
      </div>
    </ModalOverlay>
  );
}

export function CreateTokenModal({ open, onClose, form, setForm, onSubmit }: {
  open: boolean; onClose: () => void;
  form: TokenFormState; setForm: React.Dispatch<React.SetStateAction<TokenFormState>>;
  onSubmit: () => void;
}) {
  return (
    <ModalOverlay open={open} onClose={onClose} ariaLabelledBy="modal-create-token-heading">
      <div className="mb-4">
        <h2 id="modal-create-token-heading" className="text-base font-semibold text-foreground">Create Design Token</h2>
        <p className="text-sm text-muted-foreground mt-1">Add a new token to this project.</p>
      </div>
      <div className="space-y-3 py-2">
        <div className="space-y-1.5">
          <Label htmlFor="token-name" className="text-xs">Name</Label>
          <Input id="token-name" placeholder="e.g. primary-500" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="token-value" className="text-xs">Value</Label>
          <Input id="token-value" placeholder="e.g. oklch(0.7 0.15 250)" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="token-type" className="text-xs">Type</Label>
            <select id="token-type" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className={selectClass}>
              {TOKEN_TYPES.map(t => (<option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="token-namespace" className="text-xs">Namespace</Label>
            <Input id="token-namespace" placeholder="e.g. color" value={form.namespace} onChange={e => setForm(f => ({ ...f, namespace: e.target.value }))} />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} disabled={!form.name.trim() || !form.value.trim()}>Create Token</Button>
      </div>
    </ModalOverlay>
  );
}

export function EditTokenModal({ open, onClose, form, setForm, onSubmit }: {
  open: boolean; onClose: () => void;
  form: TokenFormState; setForm: React.Dispatch<React.SetStateAction<TokenFormState>>;
  onSubmit: () => void;
}) {
  return (
    <ModalOverlay open={open} onClose={onClose} ariaLabelledBy="modal-edit-token-heading">
      <div className="mb-4">
        <h2 id="modal-edit-token-heading" className="text-base font-semibold text-foreground">Edit Token</h2>
        <p className="text-sm text-muted-foreground mt-1">Update the token value and properties.</p>
      </div>
      <div className="space-y-3 py-2">
        <div className="space-y-1.5">
          <Label htmlFor="edit-token-name" className="text-xs">Name</Label>
          <Input id="edit-token-name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="edit-token-value" className="text-xs">Value</Label>
          <Input id="edit-token-value" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} />
          {form.type === "color" && form.value && (
            <div className="h-8 rounded-md border border-border mt-1" style={{ background: form.value }} />
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="edit-token-namespace" className="text-xs">Namespace</Label>
          <Input id="edit-token-namespace" value={form.namespace} onChange={e => setForm(f => ({ ...f, namespace: e.target.value }))} />
        </div>
        <p className="text-[11px] text-muted-foreground">Type and version are read-only. Saving will increment the version.</p>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Save Changes</Button>
      </div>
    </ModalOverlay>
  );
}
