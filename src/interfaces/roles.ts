/**
 * @author Danny Palma
 * @fileoverview Exports the interface roles for the proyects
 */

export default interface Roles {
    permissions: 1 | 2 | 3 | 4;
    user_id: string;
};
/**
 * Permissions:
 * 1 = quiere entrar al proyecto
 * 2 = esta adentro del proyecto
 * 3 = es moderador del proyecto
 * 4 = es el owner del proyecto
 */
