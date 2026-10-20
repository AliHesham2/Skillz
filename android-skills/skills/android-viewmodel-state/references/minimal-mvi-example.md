# A minimal UI-state example

This complete contract illustrates a simple selected-category state that needs
no repository. It is a reference snippet, not a file to add to every project.
Use the actual package, selected VM lifetime and product model when adapting it.
No test or runtime execution is implied by this example.

```kotlin
import androidx.lifecycle.ViewModel
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

enum class CatalogCategory { ALL, FAVORITES }

data class CatalogUiState(
    val category: CatalogCategory = CatalogCategory.ALL,
)

sealed interface CatalogIntent {
    data class SelectCategory(val category: CatalogCategory) : CatalogIntent
}

@HiltViewModel
class CatalogViewModel @Inject constructor() : ViewModel() {
    private val mutableUiState = MutableStateFlow(CatalogUiState())
    val uiState = mutableUiState.asStateFlow()

    fun processIntent(intent: CatalogIntent) {
        when (intent) {
            is CatalogIntent.SelectCategory -> {
                mutableUiState.update { it.copy(category = intent.category) }
            }
        }
    }
}
```

Route acquires the VM at the selected destination/graph and reads
`val state by viewModel.uiState.collectAsStateWithLifecycle()`. Screen receives
`state` and an `onCategorySelected` callback that sends SelectCategory. Do not
look up a VM from the reusable category chip. A simpler UI-local owner may be
enough if selection has no screen-level lifetime requirement.

## Extending for a real data source

Do not invent a repository return type. Inspect the project's contract, then:

1. Derive observation with a defined initial/loading/error state, or execute the
   one-shot operation with the appropriate concurrency policy.
2. Keep cancellation separate from user-facing failure.
3. Decide whether old content remains during refresh or query changes.
4. Publish a new state snapshot and handle stale request completion.
5. Express important results in state; add an acknowledged outcome only when
   the actual UI requires one. No mandatory Channel or navigation side-effect bus.

For Paging, follow its Flow<PagingData> generation/cache lifetime rather than
adapting this simple state example into manual page accumulation.
