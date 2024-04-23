import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-pagination-footer',
  templateUrl: './pagination-footer.component.html',
  styleUrl: './pagination-footer.component.scss',
})
export class PaginationFooterComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 50;
  dropdownOpen: boolean = false;
  @Output() pageChange = new EventEmitter<number>();
  itemsPerPageOptions: number[] = [20, 50, 100];
  @Input() selectedItemsPerPage: number = 10;
  @Output() selectedItems = new EventEmitter<number>();

  constructor(private elementRef: ElementRef) {}

  onPageChange(pageNumber: number) {
    this.pageChange.emit(pageNumber);
  }

  onSelectedItemsPerPageChange(numberPerPage: number) {
    this.selectedItems.emit(numberPerPage);
  }

  updateItemsPerPage(option: number) {
    this.selectedItemsPerPage = option;
    this.dropdownOpen = false;
    this.currentPage = 1; // Reset current page when changing items per page
    this.onSelectedItemsPerPageChange(option);
  }

  handleToggle() {
    this.dropdownOpen = !this.dropdownOpen;
    if (this.dropdownOpen) {
      this.listenForOutsideClicks();
    }
  }

  listenForOutsideClicks() {
    setTimeout(() => {
      document.addEventListener('click', this.onClickOutsideDropdown);
    });
  }

  onClickOutsideDropdown = (event: MouseEvent) => {
    if (!this.dropdownOpen) return;
    const target = event.target as HTMLElement;
    const dropdown = this.elementRef.nativeElement.querySelector('.dropdown');
    if (dropdown && !dropdown.contains(target)) {
      this.dropdownOpen = false;
      // document.removeEventListener('click', this.onClickOutsideDropdown);
    }
  };

  calculateNumBoxes(): number {
    return Math.ceil(this.totalPages / this.selectedItemsPerPage);
  }

  generateBoxesArray(): number[] {
    const numBoxes = this.calculateNumBoxes();
    return Array.from({ length: numBoxes }, (_, index) => index + 1);
  }
  setCurrentPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.onPageChange(pageNumber);
  }
  nextPage() {
    const numPages = this.calculateNumBoxes();
    if (this.currentPage < numPages) {
      this.currentPage++;
      this.onPageChange(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.onPageChange(this.currentPage);
    }
  }

  nextSkipPage() {
    const numPages = this.calculateNumBoxes();
      this.currentPage = numPages;
      this.onPageChange(this.currentPage);
  }

  previousSkipPage() {
      this.currentPage = 1;
      this.onPageChange(this.currentPage);
  }

  calculateStartIndex(): number {
    return (this.currentPage - 1) * this.selectedItemsPerPage + 1;
  }

  calculateEndIndex(): number {
    const endIndex = this.currentPage * this.selectedItemsPerPage;
    return endIndex > this.totalPages ? this.totalPages : endIndex;
  }
}
