/*
 * Document   : PageManager.java
 * Created on : 2012-10-28, 8:43:02
 * Author     : sun
 */
package com.local.tools;

public final class PageManager {

    private int itemCount;
    private int itemStart; /* 0--  */

    private int showMaxCount;
    public final int DEFAULT_SHOW_MAX_COUNT = 20;

    public PageManager() {
        this.itemCount = -1;
        this.itemStart = 0;
        this.showMaxCount = DEFAULT_SHOW_MAX_COUNT;
    }

    public void setItemCount(int itemCount) {
        this.itemCount = itemCount;
    }

    public void setItemStart(int itemStart) {
        this.itemStart = itemStart >= 0 ? itemStart : 0;
    }

    public void setShowMaxCount(int showMaxCount) {
        this.showMaxCount = showMaxCount < 1 ? DEFAULT_SHOW_MAX_COUNT : showMaxCount;
    }

    public int getPageIndex() {
        return itemStart / showMaxCount + 1;
    }

    public int getPageCount() {
        return (itemCount % showMaxCount == 0)
                ? (itemCount / showMaxCount) : (itemCount / showMaxCount + 1);
    }

    public int getItemCount() {
        return itemCount;
    }

    public int getItemStart() {
        return itemStart;
    }

    public int getItemEnd() {
        return this.itemStart + this.showMaxCount - 1 > this.itemCount - 1
                ? this.itemCount - 1 : this.itemStart + this.showMaxCount - 1;
    }

    public int getShowMaxCount() {
        return showMaxCount;
    }

    public int getNextPageStart() {
        if (itemStart + showMaxCount > itemCount - 1) {
            return -1;
        } else {
            return itemStart + showMaxCount;
        }
    }

    public int getPrevPageStart() {
        if (getPageIndex() == 1) {
            return -1;
        } else {
            return itemStart - showMaxCount;
        }
    }

    public int getAnyPageStart(int pageIndex) {
        return (pageIndex - 1) * showMaxCount;
    }
}
