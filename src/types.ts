import React from 'react'

export interface SanityDocument {
  _id: string
  [key: string]: any
}

export interface SanityImage {
  _type?: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface DialogLabels {
  /**
   * Title above the dialog.
   */
  title?: string
  /**
   * Text of the generation button.
   */
  finishCta?: string
  /**
   * The a11y title for the close button in the dialog.
   */
  ariaClose?: string
}

export interface LayoutData {
  [key: string]: any
}

export type PrepareFunction<Data = LayoutData> = (document: SanityDocument) => Data

export type LayoutFieldTypes =
  | 'string'
  | 'text'
  | 'number'
  | 'image'
  | 'object'
  | 'boolean'
  | 'array'
  | 'date'
  | 'datetime'
  | 'reference'

export interface LayoutField {
  /**
   * Labels for editors changing the value of the property live.
   */
  title: string
  description?: string
  /**
   * Equivalent to the property name in prepare's resulting LayoutData object.
   */
  name: string
  /**
   * Array, date, datetime, reference and image aren't supported (yet?)
   */
  type: LayoutFieldTypes
  /**
   * Exclusive to objects
   */
  fields?: LayoutField[]
  /**
   * Helpful error message for editors when they can't edit that given field in the Editor dialog.
   * Exclusive to non-supported types
   */
  unsupportedError?: string
  options?: {
    list: {title: string; value: string}[]
  }
}

export type EditorLayout<Data = LayoutData> = {
  /**
   * Needs to be unique to identify this layout among others.
   */
  name: string
  /**
   * Visible label to users. Only shows when we have 2 or more layouts.
   */
  title?: string
  /**
   * React component which renders
   */
  component?: React.FC<Data>
  /**
   * Function which gets the current document.
   * Is irrelevant in the context of studio tools as the layout won't receive a document, so if you're only using it there you can ignore this.
   */
  prepare?: PrepareFunction<Data>
  /**
   * Fields editable by users to change the component data and see changes in the layout live.
   */
  fields?: LayoutField[]
  /**
   * Common examples include:
   * 1200x630 - Twitter, LinkedIn & Facebook
   * 256x256 - WhatsApp
   * 1080x1080 - Instagram square
   */
  dimensions?: {
    width: number
    height: number
  }
}
