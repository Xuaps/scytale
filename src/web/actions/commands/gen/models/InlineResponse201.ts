/* tslint:disable */
/* eslint-disable */
/**
 * Scytale
 * Scytale.
 *
 * The version of the OpenAPI document: v1
 * Contact: admin@xuaps.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface InlineResponse201
 */
export interface InlineResponse201 {
    /**
     * 
     * @type {string}
     * @memberof InlineResponse201
     */
    id?: string;
}

export function InlineResponse201FromJSON(json: any): InlineResponse201 {
    return InlineResponse201FromJSONTyped(json, false);
}

export function InlineResponse201FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse201 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
    };
}

export function InlineResponse201ToJSON(value?: InlineResponse201 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
    };
}

