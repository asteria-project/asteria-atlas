import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd';
import { HeliosFileStats } from 'asteria-eos';

/**
 * The <code>FileExplorerNodeUtils</code> class provide convenient methods for working with tree nodes in the Atlas file
 * explorer.
 */
export class FileExplorerNodeUtils {

    /**
     * Set the children for the specified node, by using the value of the <code>model</code> property.
     * 
     * @param {NzTreeNode} node the node for which to set children.
     * @param {Array<NzTreeNodeOptions>} model the model used to set children.
     */
    public static setNodeChildren(node: NzTreeNode, model: Array<NzTreeNodeOptions>): void {
      node.clearChildren();
      node.addChildren(model);
    }

    /**
     * Build and return a node list build from the specified Helios files collection.
     * 
     * @param {Array<HeliosFileStats>} model the model used to create the node list.
     * @param {number} rootKey the root key used to define the key for each item in the node list.
     * 
     * @returns {Array<NzTreeNodeOptions>} a node list build from the specified Helios files collection.
     */
    public static buildNodeFromModel(model: Array<HeliosFileStats>, rootKey: number): Array<NzTreeNodeOptions> {
        const result: Array<NzTreeNodeOptions> = [];
        model.forEach((item: HeliosFileStats)=> {
        if (!item.isFile) {
                result.push({
                    title: item.name,
                    expanded: false,
                    key: String(rootKey++)
                });
            }
        });
        return result;
    }
    
    /**
     * Extract and return the full file path for the specified node.
     * 
     * @param {NzTreeNode} node the  tree node for which to get the full file path.
     * 
     * @returns {string} he full file path for the specified node.
     */
    public static getNodeDirPath(node: NzTreeNode): string {
        const parentNode: NzTreeNode = node.parentNode;
        const title: string = node.title;
        let result: string = '';
        if (title !== 'workspace') {
            if (parentNode) {
                const parentPath: string = FileExplorerNodeUtils.getNodeDirPath(parentNode);
                result = `${parentPath}${parentPath !== '' ? '/': ''}${title}`;
            }
        }
        return result;
    }
}