package {{NAMESPACE}}

import android.os.Bundle
import {{ACTIVITY_IMPORT}}
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import dagger.hilt.android.AndroidEntryPoint
import {{THEME_IMPORT}}
import {{ROOT_IMPORT}}

@AndroidEntryPoint
class MainActivity : {{ACTIVITY_BASE}}() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            {{THEME_FUNCTION}} {
                {{ROOT_CONTENT}}
            }
        }
    }
}
